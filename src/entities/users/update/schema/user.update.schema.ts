import z from "zod";

export const userUpdateModel = z.object({
    /** 수정한 이름 */
    updateName : z.string().min(1, "수정할 유저 이름을 입력해주세요.").max(7, "최대 7자 까지 만 입력가능합니다.").regex(/^\S+$/, "공백은 입력할 수 없습니다."),

    /** 수정한 프로필 이미지 여부 */
    updateIsProfileImg : z.boolean(),

    /** 프로필 이미지 src */
    profileImg : z.string().optional(),

    /** 수정할 프로필 이미지 파일 */
    formFile : z.custom<FormData>().optional().nullable()
}) 
