import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  try {
    const supabase = await serverSupabaseClient(event)

    const user = await serverSupabaseUser(event)

    if (!user) {
      return createError({
        status: 401,
        statusMessage: 'Unauthorized',
      })
    }

    const { data, error } = await supabase.from('workspace').select('*').eq('user_id', user.id)

    if (error) {
      console.error(error)
      return createError({
        status: 500,
        statusMessage: 'Internal Server Error',
      })
    }

    return data
  }
  catch (e) {
    console.error(e)
    return createError({
      status: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
