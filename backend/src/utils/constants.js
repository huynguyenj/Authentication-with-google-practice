export const jsonFormReturn = (success, message, data) => {
      return {
            success: success,
            message: message,
            data: data
      }
}

export const COOKIE_OPTION = {
      httpOnly: true,
      maxAge: 2 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite:'lax'
}