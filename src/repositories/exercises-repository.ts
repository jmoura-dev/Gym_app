import { Exercise, Prisma } from '@prisma/client'

export interface ExerciseRepository {
  create(data: Prisma.ExerciseUncheckedCreateInput): Promise<Exercise>
  findById(id: string): Promise<Exercise | null>
  delete(id: string): Promise<Exercise>
}
