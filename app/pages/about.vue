<script setup lang="ts">
const { data: page } = await useAsyncData("about", () => {
    return queryCollection("about").first();
});

if (!page.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Page not found",
        fatal: true,
    });
}

const { global } = useAppConfig();

const title = page.value?.seo?.title || page.value?.title;
const description = page.value?.seo?.description || page.value?.description;

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
            orientation="horizontal"
            :reverse="true"
            :ui="{
                container: 'lg:flex sm:flex-row items-center',
                title: 'mx-0! text-left',
                description: 'mx-0! text-left',
                links: 'justify-start',
            }"
        >
            <img class="object-cover w-96 rounded-lg" :src="page.hero.image.src" :alt="page.hero.image.alt">
        </UPageHero>
        <UPageSection
            :ui="{
                container: 'pt-0!',
            }"
        >
        </UPageSection>
        <AboutGear :page />
    </UPage>
</template>
