import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';

const ManageQueries = () => {
    clearPage();
    renderQueries();
}

async function renderQueries() {
    const main = document.querySelector('main');
    const title = document.createElement('h1');
    title.textContent = 'Manage Queries Page';
    main.appendChild(title);

    const url = 'http://localhost:3000/queries';
    const responseFetch = await fetch(url);
    const data = await responseFetch.json();

    data.forEach(query => {
        const queryElement = document.createElement('div');
        const statusSelect = document.createElement('select');
        const statusOptions = ['requested', 'accepted', 'refused', 'done'];

        statusOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            if (option === query.status) {
                optionElement.selected = true;
            }
            statusSelect.appendChild(optionElement);
        });

        statusSelect.addEventListener('change', (event) => {
            updateQueryStatus(query.id, event.target.value);
        });

        queryElement.textContent = query.subject;
        queryElement.appendChild(statusSelect);
        main.appendChild(queryElement);
    });
}

async function updateQueryStatus(id, newStatus) {
    const url = `http://localhost:3000/queries/${id}`;
    const updatedQuery = {
        status: newStatus
    };

    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedQuery)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Succès:', data);
        Navigate('/queries');
    })
    .catch((error) => {
        console.error('Erreur:', error);
    });
}

export default ManageQueries;
