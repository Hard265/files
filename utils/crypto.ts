import * as Crypto from 'expo-crypto';

export async function sha256(input: string): Promise<string> {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    input
  );
}

export async function getGravatarUrl(email: string): Promise<string> {
  const normalizedEmail = email.trim().toLowerCase();
  const hash = await sha256(normalizedEmail);
  return `https://www.gravatar.com/avatar/${hash}`;
}
