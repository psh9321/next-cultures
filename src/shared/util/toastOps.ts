/** 로그인이 필요한 서비스 를 비로그인 상태에서 이용 할 시 */

class ToastOptsItem {
    title : string;
    contents : string;
    submitBtnTxt? : string
    cancelBtnTxt? : string

    constructor(title : string, contents : string, submitBtnTxt? : string, cancelBtnTxt? : string) {
        this.title = title;
        this.contents = contents;
        if(submitBtnTxt) this.submitBtnTxt = submitBtnTxt;
        if(cancelBtnTxt) this.cancelBtnTxt = cancelBtnTxt;
    }
}

/**
 * unLogin : 비로그인
 * unknownError : 알수없는 에러
 * unAuthorized : 토큰이 유효하지 않을때 or 만료됐을때
 * reviewDelete : 리뷰 삭제
 * mettingDelete : 모임 삭제
 * mettingDelete : 회원 탈퇴
 */
export const toastOpts = {

    /** 비 로그인 */
    unLogin : new ToastOptsItem("로그인 후 이용 가능", "로그인 후 이용해주세요."),

    /** 알수없는 에러 */
    unknownError : new ToastOptsItem("알수없는 에러", "잠시후 다시 시도해주세요."),

    /** 파일 용량 초과 */
    fileSizeOver : new ToastOptsItem("파일 용량 초과", "5MB 이하 이미지만 업로드 가능합니다."),

    /** 토큰이 유효하지 않을때 or 만료됐을때 */
    unAuthorized : new ToastOptsItem("로그인 시간 만료", "다시 로그인 해주세요."),

    /** 리뷰 삭제 */
    reviewDelete : new ToastOptsItem("해당 리뷰를 삭제 하시겠습니까?", "", "삭제", "취소"),

    /** 모임 삭제 */
    mettingDelete : new ToastOptsItem("해당 모임을 삭제 하시겠습니까?", "", "삭제", "취소"),

    /** 회원 탈퇴 */
    userDelete : new ToastOptsItem("회원탈퇴 하시겠습니까?", "", "탈퇴", "취소"),
}
