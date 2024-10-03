import MessageHistory from "#models/message_history"

export const get_template_body = async (message_history_hash: string): Promise<MessageHistory | null> => {
  const query = await MessageHistory.query()
    .preload('mailTemplate')
    .where('hash', message_history_hash)
    .first()
    return query
}
