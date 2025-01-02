import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { createWorkspaceSchema } from '~/utils/schemas'

export default defineEventHandler(async (event) => {
  try {
    const client = await serverSupabaseClient(event)

    const user = await serverSupabaseUser(event)

    if (!user) {
      return createError({
        status: 401,
        statusMessage: 'Unauthorized',
      })
    }

    const { data: body, error } = await readValidatedBody(event, body => createWorkspaceSchema.safeParse(body))

    if (error) {
      return createError({
        status: 400,
        statusMessage: error.message,
      })
    }

    const { data } = await client.from('workspace').insert({
      name: body.name,
      user_id: user.id,
    })

    return {
      status: 201,
      data,
    }
  }
  catch (e) {
    console.error(e)
    return createError({
      status: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
