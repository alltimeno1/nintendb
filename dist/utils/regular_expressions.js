"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardRegExp = void 0;
const boardRegExp = (title, text, id, password, email = '') => {
    let message = '';
    const reId = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,10}$/;
    let re;
    if (title) {
        re = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,30}$/;
        message += re.test(title) ? '' : '제목은 30자 이하\\n';
    }
    if (text) {
        re = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,100}$/;
        message += re.test(text) ? '' : '댓글은 100자 이하\\n';
    }
    if (email) {
        re = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;
        message += re.test(email) ? '' : 'ex) 아이디@example.com\\n';
    }
    else {
        re = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,10}$/;
        message += re.test(password)
            ? ''
            : '비밀번호는 4~10자, 알파벳과 숫자 각각 1자 이상, 특수문자 금지 \\n';
    }
    message += reId.test(id) ? '' : '아이디는 10자 이하\\n';
    message += message ? '위와 같이 입력해주세요!' : '';
    return message;
};
exports.boardRegExp = boardRegExp;
