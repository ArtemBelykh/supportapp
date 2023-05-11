(() => {
  console.log('funnel')
  $('.funnel-section .content').append(generateHeader());
  function generateHeader() {
    return `<div class="header"><h3 class="header__title">Funnels</h3></div>`
  }

  fetch('./sql/sql_get_funnel_by_id.php')
    .then(r => r.json())
    .then(data => {
      console.log(`data`, data)
      // TODO mapped data 
      // const dataWithNum = data.map((el, i) => {
      //   return {...el, num: }
      // }) 

      const groupedData = _.groupBy(data, 'level');
      console.log(`groupedData`, groupedData)

      const levels = Math.max(...Object.values(groupedData).map(el => el.length));
      let iArr = [...Array(levels).keys()];

      console.log(`iArr`, iArr);

      const hash = {};

      for(let i=0; i<iArr.length; i++) {
        hash[i+1] = Object.values(groupedData).map((el, idx) => {
          return el[i];
        });
      }
      const blocks = data.map(createBlock).join('');

      const div = document.createElement('div');
      div.className = 'content__bottom'
      document.querySelector('.content').append(div)
      document.querySelector('.content__bottom').insertAdjacentHTML('beforeend', blocks);

      


    function addHiddenOpt(target = document) {
      console.log(`target.querySelector('.block select.back')`, target.querySelector('.block select.back'))
      console.log(`target.querySelector('.block select.forward')`, target.querySelector('.block select.forward'))
      target.querySelector('.block select.back') && target.querySelector('.block select.back').insertAdjacentHTML('afterbegin', `<option hidden disabled selected value="">Select</option>`);
      target.querySelector('.block select.forward') && target.querySelector('.block select.forward').insertAdjacentHTML('afterbegin', `<option hidden disabled selected value="">Select</option>`);
    }
    
    addHiddenOpt();
    
    document.querySelectorAll('.block')[0].style.display = 'flex';
    document.querySelectorAll('.block')[0].classList.add('activeBlock');
    
    
    function createBlock({funnel_id, sources, targets, funnel_name}) {   
      return `
        <div class="block" data-id="${funnel_id}">
          <p class="block__title">Block# ${funnel_id} ${funnel_name}</p>
          
          <div class="left">
            ${sources ? 
              '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" class="svg-inline--fa fa-angle-left fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg>' :
              ''}
          </div>
          <div class="right">
            ${targets ? '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" class="svg-inline--fa fa-angle-right fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>' : ''}
          </div>
          <div class="block__bottom">
            <div>
              ${sources ? `
                <label>Back</label>
                <select class="back">
                  ${sources && sources.map(({id}, i) => `<option value="${id}">${id} ${data.find(el => el.funnel_id === id).funnel_name}</option>`).join('')}
                </select>
              ` : ''}
            </div>
            <div>
              ${targets ? `
                <label>Forward</label>
                <select class="forward">
                  ${targets && targets.map(({id}, i) => `<option value="${id}">${id} ${data.find(el => el.funnel_id === id).funnel_name}</option>`).join('')}
                </select>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    }

    const selects = document.querySelectorAll('.block select');

    for(const select of selects) {
      select.addEventListener('change', selectHandler);
    }

    function displayNoneAllBlocks() {
      const blocks = $('.block');
      for(const block of blocks) {
        block.style.display = 'none';
        block.classList.remove('activeBlock');
      }
    }

    function selectHandler(e) {
      // let id = e.target.value;
      // console.log('handler', id)
      // document.querySelector('.content__top').innerHTML = '';
      // document.querySelector('.content__bottom').innerHTML = '';
      // const div = document.createElement('div');
      // div.className = 'content__top'
      // document.querySelector('.content').append(div);

      
      
    }
    
    function generateBoxesView() {
      if (document.querySelector('.content__top')) {
        document.querySelector('.content__top').remove();
      }
      const div = document.createElement('div');
      div.className = "content__top"
      document.querySelector('.content').insertBefore(div, document.querySelector('.content__bottom'));
      function createTable() {
        return `<table class="table-view"><tbody></tbody></table>`
      }
    
      document.querySelector('.content__top').insertAdjacentHTML('afterbegin', createTable());
      
      for(let key in hash) {
        const tr = document.createElement('tr');
        tr.dataset.id = key;
        document.querySelector('.table-view tbody').append(tr);
        hash[key].forEach((el, i) => {
          document.querySelector(`.table-view tbody tr[data-id="${key}"]`).append(generateBoxItem(el, el?.funnel_id));
        })
      }

      highlightPotentialElements();

      document.querySelector('.right').addEventListener('click', moveForward);
      document.querySelector('.left').addEventListener('click', moveBack);

      document.querySelector('.table-view tbody').addEventListener('click', (e) => {
        const tdId = e.target.dataset.funnelId;
        const activeTdId = document.querySelector('.table-view__item.active').dataset.funnelId;
        if (tdId !== '0' || tdId === activeTdId) {
          document.querySelector('.content__top').innerHTML = '';
          document.querySelector('.content__bottom').innerHTML = '';
  
          document.querySelector('.content__bottom').insertAdjacentHTML('afterbegin', blocks);
          displayNoneAllBlocks();
          const currBlock = document.querySelector(`.block[data-id="${tdId}"]`);
          console.log(`currBlock`, currBlock)
          currBlock.style.display = 'flex';
          currBlock.classList.add('activeBlock');
          addHiddenOpt(currBlock);
        
          currBlock.querySelector('select.back') && currBlock.querySelector('select.back').addEventListener('change', selectHandler);
          currBlock.querySelector('select.forward') && currBlock.querySelector('select.forward').addEventListener('change', selectHandler);
          generateBoxesView();
  
          currBlock.querySelector('.right').removeEventListener('click', moveForward);
          currBlock.querySelector('.right').addEventListener('click', moveForward);
  
          currBlock.querySelector('.left').removeEventListener('click', moveBack);
          currBlock.querySelector('.left').addEventListener('click', moveBack);
        
          for(let el of document.querySelectorAll(`table td`)) {
            el.classList.remove('active');
            el.classList.remove('potential-forward');
            el.classList.remove('potential-back');
          }
    
          const activeEl = document.querySelector(`table td[data-funnel-id="${tdId}"]`);
          activeEl.classList.add('active');
          
          highlightPotentialElements();

        }
        return;


      }) 
      
    }
    
    function generateBoxItem(el, id) {
    // console.log(`i`, i)
      const td = document.createElement('td');
      td.dataset.funnelId = id | null;
      td.dataset.descr = el?.funnel_name || '';
      td.className = 'table-view__item';
      if (id === 1) {
        td.classList.add('active');
      }
      td.innerHTML = el ? el.funnel_id : '';
      return td;
    }
    
    generateBoxesView();

    highlightPotentialElements();


    function highlightPotentialElements() {
      const activeItemId = document.querySelector('.table-view__item.active').dataset.funnelId;
      const { targets, sources } = data.find(el => el.funnel_id === +activeItemId);
      console.log(`targets`, targets)
      console.log(`sources`, sources)
      if (targets) {
        for(const {id} of targets) {
          if (document.querySelector(`.table-view__item[data-funnel-id="${id}"]`)) {
            document.querySelector(`.table-view__item[data-funnel-id="${id}"]`).classList.add('potential-forward');
          }
        }
      }

      if (sources) {
        for(const {id} of sources) {
          if (document.querySelector(`.table-view__item[data-funnel-id="${id}"]`)) {
            document.querySelector(`.table-view__item[data-funnel-id="${id}"]`).classList.add('potential-back');
          }
        }
      }
    }

    function moveForward(e) {
      const selectValue = document.querySelector('.activeBlock select.forward');
      const index = selectValue.options[selectValue.selectedIndex].value;
      console.log(`index`, index)
      if (index !== '') {

        document.querySelector('.content__top').innerHTML = '';
        document.querySelector('.content__bottom').innerHTML = '';

        document.querySelector('.content__bottom').insertAdjacentHTML('afterbegin', blocks);
        displayNoneAllBlocks();
        const currBlock = document.querySelector(`.block[data-id="${index}"]`);
        console.log(`currBlock`, currBlock)
        currBlock.style.display = 'flex';
        currBlock.classList.add('activeBlock');
        addHiddenOpt(currBlock);
      
        currBlock.querySelector('select.back') && currBlock.querySelector('select.back').addEventListener('change', selectHandler);
        currBlock.querySelector('select.forward') && currBlock.querySelector('select.forward').addEventListener('change', selectHandler);
        generateBoxesView();

        currBlock.querySelector('.right').removeEventListener('click', moveForward);
        currBlock.querySelector('.right').addEventListener('click', moveForward);

        currBlock.querySelector('.left').removeEventListener('click', moveBack);
        currBlock.querySelector('.left').addEventListener('click', moveBack);
      
        for(let el of document.querySelectorAll(`table td`)) {
          el.classList.remove('active');
          el.classList.remove('potential-forward');
          el.classList.remove('potential-back');
        }
  
        const activeEl = document.querySelector(`table td[data-funnel-id="${index}"]`);
        activeEl.classList.add('active');
        
        highlightPotentialElements();
      }
      return;
    }

    function moveBack(e) {
      const selectValue = document.querySelector('.activeBlock select.back');
      const index = selectValue.options[selectValue.selectedIndex].value;
      console.log(`index`, index)
      if (index !== '') {

        document.querySelector('.content__top').innerHTML = '';
        document.querySelector('.content__bottom').innerHTML = '';

        document.querySelector('.content__bottom').insertAdjacentHTML('afterbegin', blocks);
        displayNoneAllBlocks();
        const currBlock = document.querySelector(`.block[data-id="${index}"]`);
        console.log(`currBlock`, currBlock)
        currBlock.style.display = 'flex';
        currBlock.classList.add('activeBlock');
        addHiddenOpt(currBlock);
      
        currBlock.querySelector('select.back') && currBlock.querySelector('select.back').addEventListener('change', selectHandler);
        currBlock.querySelector('select.forward') && currBlock.querySelector('select.forward').addEventListener('change', selectHandler);
        generateBoxesView();

        currBlock.querySelector('.right').removeEventListener('click', moveForward);
        currBlock.querySelector('.right').addEventListener('click', moveForward);

        currBlock.querySelector('.left').removeEventListener('click', moveBack);
        currBlock.querySelector('.left').addEventListener('click', moveBack);
      
        for(let el of document.querySelectorAll(`table td`)) {
          el.classList.remove('active');
          el.classList.remove('potential-forward');
          el.classList.remove('potential-back');
        }
  
        const activeEl = document.querySelector(`table td[data-funnel-id="${index}"]`);
        activeEl.classList.add('active');
        
        highlightPotentialElements();
      }
      return;
    }

    

  })

  

  


  

})()