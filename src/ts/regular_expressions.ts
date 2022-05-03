type BoardRegExp = (title: string, comment: string, id: string, password: string) => string

const boardRegExp: BoardRegExp = (title, comment, id, password) => {
  let message: string = ''
  const reId: RegExp = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,10}$/
  const rePassword: RegExp = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,10}$/

  if (title) {
    const reTitle: RegExp = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,30}$/

    message += reTitle.test(title) ? '' : '제목은 30자 이하\\n'
  } else {
    const reComment: RegExp = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,100}$/

    message += reComment.test(comment) ? '' : '댓글은 100자 이하\\n'
  }

  message += reId.test(id) ? '' : '아이디는 10자 이하\\n'
  message += rePassword.test(password)
    ? ''
    : '비밀번호는 4~10자, 알파벳과 숫자 각각 1자 이상, 특수문자 금지 \\n'
  message += message ? '위와 같이 입력해주세요!' : ''

  return message
}

module.exports = { boardRegExp }
