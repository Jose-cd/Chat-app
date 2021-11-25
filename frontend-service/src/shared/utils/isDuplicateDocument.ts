import { Message } from '../../generated/graphql'
// super simplified dupe doc checker
export default function isDuplicateDocument(
  newDocument: Message,
  existingDocuments: Message[]
) {
  return (
    newDocument.id !== null &&
    existingDocuments.some((doc) => newDocument.id === doc.id)
  )
}
