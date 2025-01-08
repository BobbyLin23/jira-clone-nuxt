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

    // 步骤1: 获取用户的workspace成员关系
    const { data: memberships, error: memberError } = await supabase
      .from('member')
      .select('workspace_id')
      .eq('user_id', user.id)

    if (memberError) {
      console.error('Member query error:', memberError)
      return createError({
        status: 500,
        message: 'Failed to fetch memberships',
      })
    }

    // 步骤2: 获取workspace详情
    const { data: workspaces, error: workspaceError } = await supabase
      .from('workspace')
      .select('*, members:member(*)')
      .in('id', memberships.map(m => m.workspace_id))
      .order('created_at', { ascending: false })

    if (workspaceError) {
      console.error('Workspace query error:', workspaceError)
      return createError({
        status: 500,
        message: 'Failed to fetch workspaces',
      })
    }

    return workspaces || []
  }
  catch (e) {
    console.error(e)
    return createError({
      status: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
