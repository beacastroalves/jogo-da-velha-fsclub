const itemRefs = document.querySelectorAll('.item');
const containerRef = document.querySelector('.container');
const winningMessagetRef = document.querySelector('.data-winning-message');
const winningMessageTextRef = document.querySelector('.data-winning-message-text');

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
  for (const item of itemRefs) {
    item.addEventListener('click', handleClick, { once: true });
  };

  isCircleTurn = false;

  containerRef.classList.add('x');
}

const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextRef.innerText = 'Empate!';
  } else {
    winningMessageTextRef.innerText = isCircleTurn ? 'O venceu!' : 'X venceu!';
  }

  winningMessagetRef.classList.add('show-message');
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

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  containerRef.classList.remove('o');
  containerRef.classList.remove('x');

  if (isCircleTurn) {
    containerRef.classList.add('o');
  } else {
    containerRef.classList.add('x');
  }
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
