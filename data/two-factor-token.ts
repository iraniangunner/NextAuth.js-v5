import { db } from "@/lib/db";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = db.twoFactorToken.findUnique({
      where: { token },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = db.twoFactorToken.findFirst({
      where: { email },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};
