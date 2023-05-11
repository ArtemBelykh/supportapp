$(document).ready(function () {
  $('.collapsible').collapsible({
    onOpenStart(el) {
      $(el).find('i').addClass('--rotated')
    },
    onCloseStart(el) {
      $(el).find('i').removeClass('--rotated')
    }
  });

  function animateMagnet(el, posTop, posLeft, speed) {
    $(el).animate(
      {
        // top: ui.helper.position().top - top,
        // left: ui.helper.position().left - left
        top: posTop,
        left: posLeft
      },
      speed
    );
  }

  let col1 = Array(3).fill(null).map((el, i) => ({ id: i + 1 }));
  fetch('')
  const col2Text = ['Life Events', 'Loss interests', 'Felt Angry'];
  const col1Text = [
      {id: 1,name: 'Does being with your pet make feel happy ?'},
      {id: 2,name: 'Does being with your pet make feel happy ?'},
      {id: 3,name: 'Does being with your pet make feel happy ?'},
      ]
    let col2 = Array(3).fill(null).map((el, i) => ({ id: i + 1, text: col2Text[i] }));
    col2.forEach((data) => {
        //console.log(data)
    })

  let col1ui, col2ui = ``;
  let map = [{}];
  renderCol1();
  renderCol2();

    col1Text.forEach((data) => {
      //console.log(data)
      $('.jotform-fields__list').append(`<li class="jotform-fields__item">${data.name}</li>`)
      })


  $(".dragbox").draggable({
    appendTo: '.ontraport-fields__item.active',
    revert: "invalid",
    helper: "clone",

    start: function (event, ui) {
      $(ui.helper).css('width', `${$(event.target).width() + 20}px`);
    },
  });
    function markDroppableDisabled() {
        $('.save-data').on('click', (event) => {
            event.preventDefault()
            delete map[0]
            console.log(map)
        })
            Object.keys(map).forEach(k => {
            if (map[k] !== undefined) {
                $(`.matched-fields__list .dropbox[data-dropid=${k}]`).droppable('disable')
            } else {
                $(`.matched-fields__list .dropbox[data-dropid=${k}]`).droppable('enable');
            }
            })

    }

    markDroppableDisabled()
  $(".matched-fields__list .dropbox").droppable({
    accept: ".dragbox",

    drop: function (event, ui) {
      const draggable = ui.draggable;
      const droppable = $(this);
      const droppablePos = droppable.offset();
      const droppableId = droppable.data('dropid');
      const draggableId = ui.draggable.data('dragid');

      if (Object.values(map).length === 0) {
        map[droppableId] = draggableId;
      }

      if (Object.values(map).includes(draggableId)) {
        const mapKey = Object.keys(map).find(k => map[k] === draggableId);

        map[mapKey] = undefined;
        map[droppableId] = draggableId;
      } else {
        map[droppableId] = draggableId;
      }

      draggable.css({ position: 'absolute' })

      $('.matched-fields__list').append(draggable);

      animateMagnet(draggable, droppablePos.top, droppablePos.left, 0)

      const fullWidth = parseInt(droppable.css('paddingLeft'), 10) + droppable.width();
      draggable.css('width', `${fullWidth}px`);

      col2 = col2.map(el => {

        if (el.id === draggableId) {
            return { ...el, hidden: true }
        } else {
          return el
        }
      })

      renderCol2();

      $('.collapsible-body').css('display', 'block');

      $('.matched-fields__list .dragbox').draggable({
        appendTo: '.matched-fields__list',
        revert: "invalid",
        helper: "clone",
        start: function (event, ui) {
          ui.helper.css('width', `${$(event.target).width() + 20}px`);
        },
      });

      $('.ontraport-fields__item.active .dragbox').draggable({
        appendTo: '.ontraport-fields__item.active',
        revert: "invalid",
        helper: "clone",
        start: function (event, ui) {
          $(ui.helper).css('width', `${$(event.target).width() + 20}px`);
        },
      });

      if (!$(ui.draggable.get(0)).find('.del-btn').length) {
        $(ui.draggable.get(0)).append('<div class="del-btn">X</div>');

        const data = $('.del-btn', ui.draggable.get(0)).parent().data();

        $('.del-btn', draggable).on('click', (e) => {
          $('.del-btn', draggable).remove();

          draggable.css({ position: 'absolute' });
          $('.ontraport-fields__item').append(draggable);

          let mapKey = Object.keys(map).find(k => map[k] === data.dragid);
          map[mapKey] = undefined;

          col2 = col2.map(el => {
              //console.log(data.dragid)
            if (el.id === data.dragid) {
              return { ...el, hidden: false }
            } else {
              return el
            }
          })
          renderCol2();
          $('.collapsible-body').css('display', 'block');
          $('.dragbox').draggable({
            appendTo: '.ontraport-fields__item.active',
            revert: "invalid",
            helper: "clone",
            start: function (event, ui) {
              ui.helper.css('width', `${$(event.target).width() + 20}px`);
            },
          });
        })
      }
    }
  });

  function renderCol1() {
    col1ui = col1.map(el => {
      return `
        <li class="dropbox matched-fields__item" data-dropid=${el.id}></li>
      `
    }).join(' ');
    $('.matched-fields__list').html('');
    $('.matched-fields__list').append(col1ui);
  }

  function renderCol2() {
    col2ui = col2.map(el => {
      if (!el.hidden) {
        return `
          <div class="dragbox ui-draggable ui-draggable-handle collapsible-body" data-dragid=${el.id}>
            <span class="dragbox__text">${el.text}</span>
          </div>
        `
      }
    }).join(' ');
    $('.ontraport-fields__item .dragbox').remove();
    $('.ontraport-fields__item:first').append(col2ui)
  }
});
