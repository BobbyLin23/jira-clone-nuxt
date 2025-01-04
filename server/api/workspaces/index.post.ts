import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  try {
    const client = await serverSupabaseClient(event)

    const user = await serverSupabaseUser(event)

    if (!user) {
      return createError({
        status: 401,
        message: 'Unauthorized',
      })
    }

    const formData = await readMultipartFormData(event)
    if (!formData) {
      return createError({
        status: 400,
        message: 'No form data received',
      })
    }

    const name = formData.find(item => item.name === 'name')?.data.toString()
    const imageFile = formData.find(item => item.name === 'image')

    if (!name) {
      return createError({
        status: 400,
        message: 'Name is required',
      })
    }

    let image_url

    if (imageFile) {
      // Generate a unique filename for the image
      const fileName = `${user.id}/${Date.now()}_${imageFile.filename}`

      const { data, error: uploadError } = await client.storage
        .from('images')
        .upload(fileName, imageFile.data, {
          contentType: imageFile.type,
          cacheControl: '3600',
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        return createError({
          status: 500,
          message: 'Failed to upload image',
        })
      }

      // get the public URL of the uploaded image
      image_url = data?.path
    }

    const { data: workspace, error: insertError } = await client
      .from('workspace')
      .insert({
        name,
        user_id: user.id,
        image_url,
      })
      .select()
      .single()

    if (insertError) {
      console.error('Insert error:', insertError)
      return createError({
        status: 500,
        message: 'Failed to insert workspace',
      })
    }

    return workspace
  }
  catch (e) {
    console.error(e)
    return createError({
      status: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
