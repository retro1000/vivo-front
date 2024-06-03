const useBase64 = () => {

  const FileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
  }

  const StringToBase64 = (str) => {
    return btoa(str);
  }

  const Base64ToString = (base64) => {
    return atob(base64);
  }

  return { FileToBase64, StringToBase64, Base64ToString }
}

export {useBase64}
