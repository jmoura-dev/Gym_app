import { Exercise, Prisma } from '@prisma/client'

export interface ExerciseRepository {
  create(data: Prisma.ExerciseUncheckedCreateInput): Promise<Exercise>
}
