import type { Database } from '~/types/database.types'

export type Workspace = Database['public']['Tables']['workspace']['Row']
export type InsertWorkspace = Database['public']['Tables']['workspace']['Insert']
