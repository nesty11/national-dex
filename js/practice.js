let modalContainer = document.querySelector('#modal-container');

        function showModal(title, text) {

            //Clear all existing modal content
            modalContainer.innerHTML = '';
            let modal = document.createElement('div');
            modal.classList.add('modal');

            //Add the new modal content
            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText = 'Close';
            closeButtonElement.addEventListener('click', hideModal);

            let titleElement = document.createElement('h1');
            titleElement.innerText = title;

            let contentElement = document.createElement('p');
            contentElement.innerText = text;

            modal.appendChild(closeButtonElement);
            modal.appendChild(titleElement);
            modal.appendChild(contentElement);
            modalContainer.appendChild(modal);
            modalContainer.classList.add('is-visible');
        }

        let dialogPromiseReject; //This cn be set later, by showDialog
        
        function hideModal() {
            modalContainer.classList.remove('is-visible');

            if (dialogPromiseReject){
                dialogPromiseReject();
                dialogPromiseReject = null;
            }
        }

        function showDialog(title, text){
            showModal(title, text);

            //We want to add a confirm and cancel button to the modal

        let modal = modalContainer.querySelector('.modal');

        let confirmButton = document.createElement('button');
        confirmButton.classList.add('modal-confirm');
        confirmButton.innerText = 'Confirm';

        let cancelButton = document.querySelector('button');
        cancelButton.classList.add('modal-cancel');
        cancelButton.innerText = 'Cancel';

        modal.appendChild(confirmButton);
        modal.appendChild(cancelButton);

        //We want to focus the confirmButton so that the user can simply press Enter
        confirmButton.focus();

        return new Promise((resolve, reject) => {
            cancelButton.addEventListener('click', hideModal);
            confirmButton.addEventListener('click', hideModal);
            dialogPromiseReject = null; // Reset this
            hideModal();
            resolve();
        });
        //This can be used to reject from other functions
        dialogPromiseReject = reject;
    };
        

        document.querySelector('#show-dialog').addEventListener('click', () => {
            showDialog('Confirm Action', 'Are you sure you want to do this?').then(function(){
                alert('Confirmed!');
            }, () => {
                alert('Not Confirmed');
            });
        });


        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                hideModal();
            }
        });

        modalContainer.addEventListener('click', (e) => {
            //Since this is also triggered when clicking INSIDE the modal; we only want to close if the user clicks directly on the overlay
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });

        document.querySelector('#show-modal').addEventListener('click', () => {
            showModal();
        });
    


        function showDialog(title, text){
          showModal(title, text);

          //We want to add a confirm and cancel button to the modal

      let modal = modalContainer.querySelector('.modal');

      let confirmButton = document.createElement('button');
      confirmButton.classList.add('modal-confirm');
      confirmButton.innerText = 'Confirm';

      let cancelButton = document.querySelector('button');
      cancelButton.classList.add('modal-cancel');
      cancelButton.innerText = 'Cancel';

      modal.appendChild(confirmButton);
      modal.appendChild(cancelButton);

      //We want to focus the confirmButton so that the user can simply press Enter
      confirmButton.focus();

      return new Promise((resolve, reject) => {
          cancelButton.addEventListener('click', hideModal);
          confirmButton.addEventListener('click', hideModal);
          dialogPromiseReject = null; // Reset this
          hideModal();
          resolve();
      });
      //This can be used to reject from other functions
      dialogPromiseReject = reject;
  };