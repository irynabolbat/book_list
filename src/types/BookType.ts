export interface Book {
  id: number,
  title: string,
  authorId: number | null,
  categoryId: number | null,
  isbn: number | null,
  createdAt: string,
  modifiedAt: string | null,
  status: string
}