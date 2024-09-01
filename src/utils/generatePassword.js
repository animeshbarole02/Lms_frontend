export const generatePassword = (length = 12) => {
    // Define character sets
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialCharacters = "!@#$%^&*()_+[]{}|;:,.<>?";
  
    // Combine all character sets into one
    const allCharacters = uppercaseLetters + lowercaseLetters + numbers + specialCharacters;
  
    // Ensure the password includes at least one character from each set
    const getRandomCharacter = (characters) => characters[Math.floor(Math.random() * characters.length)];
  
    let password = [
      getRandomCharacter(uppercaseLetters),
      getRandomCharacter(lowercaseLetters),
      getRandomCharacter(numbers),
      getRandomCharacter(specialCharacters),
    ];
  
    // Fill the rest of the password length with random characters from all sets
    for (let i = password.length; i < length; i++) {
      password.push(getRandomCharacter(allCharacters));
    }
  
    // Shuffle the password array to ensure randomness
    password = password.sort(() => Math.random() - 0.5);
  
    // Convert array to string and return
    return password.join('');
  }