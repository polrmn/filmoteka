// import getMovies from './fetchApiByQuery';
// const q = 'zombie'
// onSearchInput(q)

// async function onSearchInput(q) {
//     const a = await getMovies(q);
//     console.log(a);
//     console.log('SFLhf');
// }

// const {cardList} = {
//     cardList: document.querySelector('.card-list'),
// }

// const array = [{
//     url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSwWbgPV-hyMdfBxgfFY_8c7NC_j2x_jO99w&usqp=CAU',
//     name: 'GREYHOUND',
//     genre: 'Drama',
//     data: '2020',
//     rating: 10
// }, {
// url: ,
// name: 'GREYHOUND','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSwWbgPV-hyMdfBxgfFY_8c7NC_j2x_jO99w&usqp=CAU'
//     genre: 'Drama',
//     data: '2020',
//     rating: 10
// },{
// url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSwWbgPV-hyMdfBxgfFY_8c7NC_j2x_jO99w&usqp=CAU',
//     name: 'GREYHOUND',
//     genre: 'Drama',
//     data: '2020',
//     rating: 10
// },{
//     url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSwWbgPV-hyMdfBxgfFY_8c7NC_j2x_jO99w&usqp=CAU',
//     name: 'GREYHOUND',
//     genre: 'Drama',
//     data: '2020',
//     rating: 10
// },{
//     url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSwWbgPV-hyMdfBxgfFY_8c7NC_j2x_jO99w&usqp=CAU',
//     name: 'GREYHOUND',
//     genre: 'Drama',
//     data: '2020',
//     rating: 10
//     }]

// function createListItem({
//     url, name, genre, data, rating
// }) {
//     const item = document.createElement('li')
//     item.classList.add('listItem')
//     const image = document.createElement('img')
//     image.classList.add('listItemImage')
//     image.setAttribute('src', url)
//     const filmInfoContainer = document.createElement('div')
//     filmInfoContainer.classList.add('filmInfoContainer')
//     const filmName = document.createElement('h2')
//     filmName.classList.add('filmName')
//     filmName.textContent = name
//     const filmInfo = document.createElement('span')
//     filmInfo.classList.add('filmInfo')
//     filmInfo.textContent = `${genre} |  ${data}`
//     const filmRating = document.createElement('span')
//     filmRating.classList.add('filmRating')
//     filmRating.textContent = `${rating}`
//     item.append(image)
//     filmInfoContainer.append(filmName)
//     filmInfoContainer.append(filmInfo)
//     filmInfoContainer.append(filmRating)
//     item.append(filmInfoContainer)
//     cardList.append(item)
// }
// // createListItem(film)
// array.forEach(
//     (film) => {
//     createListItem(film)
//     }
// )
