const itemRefs = document.querySelectorAll('.item');
const containerRef = document.querySelector('.container');
const winningRef = document.querySelector('.data-winning');
const winningTextRef = document.querySelector('.data-winning-text');
const restartButtonRef = document.querySelector('.data-restart-button');

let isCircleTurn;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const startGame = () => {
  isCircleTurn = false;

  for (const item of itemRefs) {
    item.classList.remove('o');
    item.classList.remove('x');
    item.removeEventListener('click', handleClick);
    item.addEventListener('click', handleClick, { once: true });
  };


  setContainerHoverClass();
  winningRef.classList.remove('show-message');
}

const endGame = (isDraw) => {
  if (isDraw) {
    winningTextRef.innerText = 'Empate!';
  } else {
    winningTextRef.innerText = isCircleTurn ? 'O venceu!' : 'X venceu!';
  }

  winningRef.classList.add('show-message');
}

const checkForWin = (currentPlayer) => {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return itemRefs[index].classList.contains(currentPlayer);
    });
  });
}

const placeMark = (item, classToAdd) => {
  item.classList.add(classToAdd);
}

const setContainerHoverClass = () => {
  containerRef.classList.remove('o');
  containerRef.classList.remove('x');

  if (isCircleTurn) {
    containerRef.classList.add('o');
  } else {
    containerRef.classList.add('x');
  }
}

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;
  setContainerHoverClass();
}

const handleClick = (e) => {
  // Colocar o X ou O em cada item
  const item = e.target;
  const classToAdd = isCircleTurn ? 'o' : 'x';

  placeMark(item, classToAdd);


  // Verificar a cada clique se houve vitória
  const isWin = checkForWin(classToAdd);

  if (isWin) {
    endGame(false);
  }

  // Verificar a cada clique se houve empate
  swapTurns();
}

startGame();

restartButtonRef.addEventListener('click', startGame);