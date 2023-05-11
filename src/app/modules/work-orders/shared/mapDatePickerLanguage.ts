export const mapLanguage = (userLanguage: string) => {
    switch(userLanguage){
      case 'CAS':
        return 'es'
      case 'POR':
        return 'pt'
      default:
        return 'es'
    }
  }