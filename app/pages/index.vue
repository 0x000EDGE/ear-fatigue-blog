<script setup lang="ts">
import { translateAxis } from "motion-v";

const { data: page } = await useAsyncData("index", () => {
    return queryCollection("index").first();
});
if (!page.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Page not found",
        fatal: true,
    });
}

useSeoMeta({
    title: page.value?.seo.title || page.value?.title,
    ogTitle: page.value?.seo.title || page.value?.title,
    description: page.value?.seo.description || page.value?.description,
    ogDescription: page.value?.seo.description || page.value?.description,
    ogImage: "https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png",
});
</script>

<template>
    <UPage v-if="page">
        <UPageHero orientation="horizontal">
            <template #title>
                <Motion
                    :initial="{
                        opacity: 0,
                        transform: 'translateX(-20px)',
                    }"
                    :animate="{
                        opacity: 1,
                        transform: 'translateX(0)',
                    }"
                    :transition="{
                        duration: 0.6,
                        delay: 0.1,
                    }"
                >
                    {{ page.title }}
                </Motion>
            </template>

            <template #description>
                <Motion
                    :initial="{
                        opacity: 0,
                        transform: 'translateX(-20px)',
                    }"
                    :animate="{
                        opacity: 1,
                        transform: 'translateX(0)',
                    }"
                    :transition="{
                        duration: 0.6,
                        delay: 0.3,
                    }"
                >
                    {{ page.description }}
                </Motion>
            </template>
            <template #default>
                <Motion
                    :initial="{
                        opacity: 0,
                        transform: 'translateX(20px)',
                    }"
                    :animate="{
                        opacity: 1,
                        transform: 'translateX(0)',
                    }"
                    :transition="{
                        duration: 0.6,
                        delay: 0.3,
                    }"
                >
                    <img
                        class=""
                        :src="page.hero.image.src"
                        :alt="page.hero.image.alt"
                    />
                </Motion>
            </template>
        </UPageHero>
        <UPageSection
            :ui="{
                container: 'pt-0! lg:grid lg:grid-cols-2 lg:gap-8',
            }"
        >
            <LandingAbout :page />
            <LandingWorkExperience :page />
        </UPageSection>
        <LandingTestimonials :page />
        <!--
    <LandingBlog :page />
    <LandingFAQ :page />
    -->
    </UPage>
</template>
