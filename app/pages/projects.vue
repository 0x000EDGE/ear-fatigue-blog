<script setup lang="ts">
const { data: page } = await useAsyncData("projects-page", () => {
    return queryCollection("pages").path("/projects").first();
});
if (!page.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Page not found",
        fatal: true,
    });
}

const { data: projects } = await useAsyncData("projects", () => {
    return queryCollection("projects").all();
});

const { global } = useAppConfig();

const title = page.value?.seo?.title || page.value?.title;
const description = page.value?.seo?.description || page.value?.description;

const allCategories = computed(() => [
    "Toutes",
    ...new Set(projects.value?.flatMap((project) => project.badges ?? [])),
]);
const selectedCategorie = ref("Toutes");
const searchQuery = ref("");

const resetSearch = () => {
    selectedCategorie.value = "Toutes"
    searchQuery.value = ""
}

const sortedProjects = computed(() => {
    if (!projects.value) return [];

    const query = searchQuery.value.trim().toLowerCase();

    return projects.value.filter((project) => {
        // 1. Le <select> filtre uniquement par catégorie (badges)
        const matchesCategory =
            selectedCategorie.value === "Toutes" ||
            project.badges?.includes(selectedCategorie.value);

        // 2. L'<input> filtre uniquement sur le "title" du projet
        const matchesTitle =
            !query || project.title?.toLowerCase().includes(query);

        return matchesCategory && matchesTitle;
    });
});

useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
});

defineOgImage("Portfolio", { title, description });
</script>

<template>
    <UPage v-if="page">
        <UPageHero
            :title="page.title"
            :description="page.description"
            :links="page.links"
            :ui="{
                title: 'mx-0! text-left',
                description: 'mx-0! text-left',
                links: 'justify-start',
            }"
        >
            <template #links>
                <div v-if="page.links" class="flex items-center gap-2">
                    <UButton
                        :label="page.links[0]?.label"
                        :to="global.meetingLink"
                        v-bind="page.links[0]"
                    />
                    <UButton
                        :to="`mailto:${global.email}`"
                        v-bind="page.links[1]"
                    />
                </div>
            </template>
        </UPageHero>
        <UPageSection
            :ui="{
                container: 'pt-0!',
            }"
        >
            <div class="flex gap-3 items-end">
                <UFormField label="Catégories" orientation="horizontal">
                    <USelect
                        v-model="selectedCategorie"
                        :items="allCategories"
                        class="min-w-32"/>
                  </UFormField>
                      <UInput v-model="searchQuery" icon="i-lucide-search" size="md" variant="outline" placeholder="Recherche..." class="flex-1 w-full" />
                      <UButton v-if="selectedCategorie !== 'Toutes' || searchQuery !== ''" icon="i-lucide-circle-x" color="neutral" variant="soft" @click="resetSearch()" class="cursor-pointer" />
            </div>

            <Motion
                v-if="sortedProjects.length > 0"
                v-for="(project, index) in sortedProjects"
                :key="project.title"
                :initial="{ opacity: 0, transform: 'translateY(10px)' }"
                :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
                :transition="{ delay: 0.2 * index }"
                :in-view-options="{ once: true }"
            >
                <UBlogPost
                    v-bind="project"
                    orientation="horizontal"
                    :reverse="index % 2 === 1"
                    target="_blank"
                    :ui="{
                        image: 'object-cover object-center',
                    }"
                >
                    <template #badge>
                        <div class="flex gap-2">
                            <UBadge
                                v-for="(badge, index) in project.badges"
                                :label="badge"
                                variant="outline"
                                color="neutral"
                            />
                        </div>
                    </template>
                </UBlogPost>
            </Motion>

            <UAlert
                v-else
                color="neutral"
                variant="soft"
                title="Aucun projets trouvé"
                description="La liste des projets est vide."
                :ui="{
                    title: 'text-center',
                    description: 'text-center'
                }"
              />
        </UPageSection>
    </UPage>
</template>
