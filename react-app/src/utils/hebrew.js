export function translateErrorStatus(sentence) {
  const regex = /(\d+)/;
  const match = sentence.match(regex);
  const num = match ? match[0] : '';
  let translate = '';
  if (
    sentence.includes(
      'The requested period does not meet the minimum duration of'
    )
  ) {
    translate = `מינימום של ${num} לילות לחלקה זו`;
  } else if (sentence.includes('Total guests has a maximum of')) {
    translate = `עד ${num} אורחים לחלקה זו`;
  }

  return translate;
}
