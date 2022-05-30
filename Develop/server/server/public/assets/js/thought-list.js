const $thoughtList = document.querySelector('#thought-list');

//TIE IN API CALLS
const getThoughtList = () => {
  fetch('/api/thoughts')
    .then(response => response.json())
    .then(thoughtListArr => {
      thoughtListArr.forEach(printThought);
    })
    .catch(err => {
      console.log(err);
    });
};

const printThought = ({ _id, thoughtName, keywords, thoughtText, continueCount, createdBy, createdAt }) => {
  const thoughtCard = `
    <div class="col-12 col-lg-6 flex-row">
      <div class="card w-100 flex-column">
        <h3 class="card-header">${thoughtName}</h3>
        <div class="card-body flex-column col-auto">
          <h4 class="text-dark">By ${createdBy}</h4>
          <p>On ${createdAt}</p>
          <p>${continueCount} Continues</p>
          <h5 class="text-dark">Suggested thoughtText: ${thoughtText}
          <h5 class="text-dark">keywords</h5>
          <ul>
            ${keywords
      .map(keyword => {
        return `<li>${keyword}</li>`;
      })
      .join('')}
          </ul>
          <a class="btn display-block w-100 mt-auto" href="/thought?id=${_id}">See the discussion.</a>
        </div>
      </div>
    </div>
  `;

  $thoughtList.innerHTML += thoughtCard;
};

getThoughtList();
