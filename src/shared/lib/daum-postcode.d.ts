interface DaumPostcodeResult {
  zonecode: string
  address: string
  addressEnglish: string
  addressType: 'R' | 'J'
  userSelectedType: 'R' | 'J'
  roadAddress: string
  jibunAddress: string
  buildingName: string
  apartment: 'Y' | 'N'
  bname: string
  bname1: string
  bname2: string
  sido: string
  sigungu: string
  sigunguCode: string
  autoRoadAddress: string
  autoJibunAddress: string
  query: string
}

interface DaumPostcodeOptions {
  oncomplete: (data: DaumPostcodeResult) => void
  width?: string | number
  height?: string | number
}

declare namespace daum {
  class Postcode {
    constructor(options: DaumPostcodeOptions)
    open(): void
  }
}
