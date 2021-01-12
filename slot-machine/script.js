const symbols = [
  {
    position: 60,
    name: 'seven',
    multiplier: 10,
  },
  {
    position: 180,
    name: 'blueberry',
    multiplier: 2,
  },
  {
    position: 300,
    name: 'watermelon',
    multiplier: 5,
  },
  // {
  //   position: 420,
  //   name: 'cherry',
  //   multiplier: 0.25,
  // },
  // {
  //   position: 540,
  //   name: 'orange',
  //   multiplier: 1,
  // },
  // {
  //   position: 660,
  //   name: 'banana',
  //   multiplier: 0.5,
  // },
]

const baseReelSpeed = 2880
let reelOutcomes = []
let newBgPosition = 2880

document.addEventListener('DOMContentLoaded', function() {
  const spinButton = document.querySelector('[data-spin]')
  const reels = document.querySelectorAll('[data-reel]')
  const outcomeText = document.querySelector('[data-text]')

  spinButton.addEventListener('click', () => {
    spinTheWheel()
  })

  const allEqual = arr => arr.every(v => v === arr[0])

  const checkIfWin = () => {
    let winMultiplier = 0
    let isWin = true

    console.log(symbols[reelOutcomes[0]].multiplier)

    if (allEqual(reelOutcomes)) {
      winMultiplier += (symbols[reelOutcomes[0]].multiplier * 4)
    } else if (reelOutcomes[0] === reelOutcomes[1]) {
      winMultiplier += symbols[reelOutcomes[0]].multiplier
    } else {
      isWin = false
    }

    console.log(winMultiplier)

    updateOutcomeText(isWin, winMultiplier)
  }

  const reelAnimationEnd = () => {
    console.log('finished')

    // updateOutcomeText()

    checkIfWin()

    reels[reels.length - 1].removeEventListener('transitionend', reelAnimationEnd)
  }

  const updateOutcomeText = (isWin, value) => {
    if (isWin) {
      outcomeText.textContent = `you win ${value}x`
    } else {
      outcomeText.textContent = 'you\'re a cunt'
    }
  }

  const spinTheWheel = () => {
    reelOutcomes = []

    reels.forEach(reel => {
      const randomPosition = Math.floor(Math.random() * symbols.length)
      const reelSpinAmount = newBgPosition + symbols[randomPosition].position

      reelOutcomes.push(randomPosition)

      console.log(symbols[randomPosition].name)

      reel.style.backgroundPosition = `0 ${reelSpinAmount}px`
    })

    newBgPosition += baseReelSpeed

    reels[reels.length - 1].addEventListener('transitionend', reelAnimationEnd, false)
  }
})