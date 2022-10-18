import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event)
	if (!user) {
		throw createError({ statusCode: 401, message: 'Unauthorized' })
	}

	const client = await serverSupabaseClient(event)

	const { data } = await client
		.from('itens')
		.select('id, title, finished')
		.eq('user', user.id)

	return { data }
})