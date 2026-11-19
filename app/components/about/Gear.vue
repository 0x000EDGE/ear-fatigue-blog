<script setup lang="ts">
import type { AboutCollectionItem } from "@nuxt/content";

defineProps<{
    page: AboutCollectionItem;
}>();
</script>

<template>
    <UPageSection
        title="Matériel"
        :ui="{
            container: 'pt-0!',
            title: 'mx-0! text-left',
            description: 'mx-0! text-left',
        }"
    >
        <UPageGrid>

            <Motion
                v-for="(gear, index) in page.gears"
                :key="index"
                :initial="{ opacity: 0, transform: 'translateY(10px)' }"
                :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
                :transition="{ delay: 0.2 * index }"
                :in-view-options="{ once: true }"
            >
                <UPageCard
                    :key="index"
                    :title="gear.title"
                    :description="gear.description"
                    variant="outline"
                    class="group"
                    :ui="{
                        wrapper: 'max-sm:order-last',
                    }"
                >
                    <img
                        :src="gear.image.src"
                        :alt="gear.image.alt"
                        class="object-cover w-full rounded-lg"
                    />
                </UPageCard>
            </Motion>
        </UPageGrid>
    </UPageSection>
</template>

<style scoped></style>
