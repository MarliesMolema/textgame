const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {},
  showTextNode(1)
}



function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('transition', 'ease-in-out', 'delay-110', 'p-5', 'm-2', 'bg-yellow-400', 'text-black', 'border-4', 'border-black', 'hover:bg-yellow-500')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You\'re an ambitious woman that wants to take the tech world by storm. \n So you decided to take the next step.',
    options: [
      {
        text: 'You google tech opportunities',
        setState: { goldCoin: true},
        nextText: 2
      },
      {
        text: 'You ask a friend who works in tech for advice',
        setState: { goldCoin: true},
        nextText: 4
      },
      {
        text: 'You decide it\'s too difficult and make dinner instead',
        setState: { goldCoin: true},
        nextText: 17
      }
    ]
  },
  {
    id: 2,
    text: 'You see a list of education opportunities but one catches your eye.',
    options: [
      {
        text: 'You decided to join an expensive bootcamp',
        requiredState: (currentState) => !currentState.rumor,
        setState: { rumor: true },
        nextText: 6
      },
      {
        text: 'You join the Alyx Program',
        requiredState: (currentState) => currentState.silverCoin && !currentState.slept,
        setState: { silverCoin: false},
        nextText: 8
      },
      {
        text: 'You get distracted and watch cat videos instead',
        requiredState: (currentState) => !currentState.silverCoin && !currentState.slept,
        nextText: 17
      },
      {
        text: 'You join a free online course',
        requiredState: (currentState) => !currentState.flirt,
        setState: { flirt: true},
        nextText: 5
      },
      {
        text: 'You join the Alyx Program',
        nextText: 3
      },
    ]
  },
  {
    id: 3,
    text: 'You\'re invited to the Alyx Assessment Day and your first task is to create a text-based game. \n You\'ve never done coding before. What do you do?',
    options: [
      {
        text: 'You try your best and have fun with your team',
        requiredState: (currentState) => !currentState.worked,
        setState: { silverCoin: true},
        nextText: 11
      },
      {
        text: 'You get lost and feel like crying',
        requiredState: (currentState) => !currentState.slept,
        setState: { slept: true},
        nextText: 17
      },
      {
        text: 'You just came for the pizza, so nothing to worry about',
        nextText: 17
      },
    ]
  },
  {
    id: 4,
    text: 'Your friend gets back to you on a Friday night and gives you two options.',
    options: [
      {
        text: 'Check out the Alyx Program, I\'ve heard good things about it',
        requiredState: (currentState) => currentState.goldCoin,
        setState: { goldCoin: false, snack: true},
        nextText: 3
      },
      {
        text: 'It\'s Friday night, forget about that, let\'s party!',
        requiredState: (currentState) => currentState.goldCoin,
        setState: { goldCoin: false, sword:true},
        nextText: 17
      }
    ]
  },
  {
    id: 5,
    text: 'You completed the free course but unfortunately it didn\'t give you the skills you needed and you couldn\'t find a job.',
    options: [
      {
        text: 'Play again',
        nextText: -1
      },
    ]
  },

  {
    id: 6,
    text: 'You check the admissions and you\'re overwhelmed with the prices. What do you do?',
    options: [
      {
        text: 'You keep looking for other options',
        requiredState: (currentState) => !currentState.goldRing,
        setState: { goldRing: true},
        nextText: -1
      },
      {
        text: 'You decide it\'s too expensive and watch Netflix instead',
        nextText: 17
      },
    ]
  },
  {
    id: 11,
    text: 'Congratulations, you successfully presented your game with your team and have made your first step in the tech world!',
    options: [
      {
        text: 'Play again',
        nextText: -1
      },
    ]
  },
  {
    id: 17,
    text: 'You had a good time but the next day you still haven\'t made a mark on the tech world. Too bad!',
    options: [
      {
        text: 'Play again',
        nextText: -1
      }
    ]
  },
 
  {
    id: 24,
    text: 'You outrun the beast, but now what?',
    options: [
      {
        text: 'Go at farm',
        nextText: 3
      },
      {
        text: 'Go to tavern',
        nextText: 2
      },
      {
        text: 'Go to shop',
        nextText: 4
      },
      {
        text: 'Go back to find the beast',
        requiredState: (currentState) => currentState.rumor,
        nextText: 5
      },
    ]
  },
]

startGame()
