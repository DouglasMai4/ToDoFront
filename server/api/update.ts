import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event)
	if (!user) {
		throw createError({ statusCode: 401, message: 'Unauthorized' })
	}

	const body = await useBody(event)

	if (!body) {
		throw createError({ statusCode: 401, message: 'No data' })
	}

	const client = await serverSupabaseClient(event)

	const { error } = await client
		.from('itens')
		.update({ finished: body.finished })
		.eq('id', body.id)

	if (error) {
		return { error }
	} else {
		return { status: 'ok' }
	}
})