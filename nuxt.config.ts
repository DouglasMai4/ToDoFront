// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	nitro: {
    		preset: "vercel",
  	},
	css: ["@/assets/css/main.css"],
	modules: ["@nuxtjs/supabase"]
})
