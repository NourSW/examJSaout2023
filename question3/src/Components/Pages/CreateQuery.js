// eslint-disable-next-line no-unused-vars
import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';

const CreateQuery = () => {
    clearPage();
    renderForm();
}

function renderForm() {
    const main = document.querySelector('main');
    const form = document.createElement('form');
    const input = document.createElement('input');
    const submit = document.createElement('input');
    const label = document.createElement('label');
  
    // Ajoutez un titre à la page
    const title = document.createElement('h1');
    title.textContent = 'Create a query Page';
    main.appendChild(title);
  
    // Ajoutez une étiquette au champ de formulaire
    label.textContent = 'Subject of your query';
    form.appendChild(label);
  
    input.type = 'text';
    input.name = 'subject';
  
    submit.type = 'submit';
    submit.value = 'Submit';
  
    form.appendChild(input);
    form.appendChild(submit);
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      createQuery(input.value);
    });
  
    main.appendChild(form);
}



async function createQuery(sujet) {
    const url = 'http://localhost:3000/queries'; // Remplacez par le chemin réel de votre API
    const responseFetch = await fetch(url);
    const data = await responseFetch.json();
    // eslint-disable-next-line prefer-destructuring
    const newId = data.length + 1;

    const newQuery = {
        id: newId,
        subject: sujet,
        status: 'requested'
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuery)
    })
    .then(response => response.json())
    .then(dataa => {
        // eslint-disable-next-line no-console
        console.log('Succès:', dataa);
        Navigate('/queries');
    })
    .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Erreur:', error);
    });
}

export default CreateQuery;