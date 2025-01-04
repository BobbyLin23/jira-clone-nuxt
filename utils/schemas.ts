import { z } from 'zod'

export const createWorkspaceSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'Required',
  }),
  image: z.instanceof(File).refine(
    file => file.size <= 1024 * 1024,
    {
      message: 'Image size must be less than 1MB',
    },
  ).refine(
    file => ['image/jpeg', 'image/png', 'image/svg', 'image/jpg'].includes(file.type),
    {
      message: 'Image must be of type jpg, jpeg, png or svg',
    },
  ),
})
