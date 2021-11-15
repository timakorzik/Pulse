$(document).ready(function () {
    $('.home-slider__wrapper').slick({
        prevArrow: '<button type="button" class="slick-prev"><img src="img/icons/arrow-left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/icons/arrow-right.png"></button>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: false,
                    dots: true
                }
            },
        ]
    });
    $('.js-open').each(function (i) {
        $(this).on('click', function (e) {
            e.preventDefault();
            $('.katalog-item__list').eq(i).addClass('katalog-item__list_active');
        });
    });
    $('.js-close').each(function (i) {
        $(this).on('click', function (e) {
            e.preventDefault();
            $('.katalog-item__list').eq(i).removeClass('katalog-item__list_active');
        });
    });
    // $('#orderModal').on('show.bs.modal', function (event) {
    //     var button = $(event.relatedTarget) // Button that triggered the modal
    //     var recipient = button.data('whatever') // Extract info from data-* attributes
    //     // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    //     // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    //     var modal = $(this)
    //     modal.find('.modal__subtitle').text(recipient)
    //   });
    $('.katalog-item__button').each(function (i) {
        $(this).on('click', function (e) {
            e.preventDefault();
            $('.modal__subtitle').text($('.katalog-item__title').eq(i).text());
        });
    });
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    $("input[type=tel]").inputmask("+999 (99) 999-99-99");  //static mask

    $(".modal__form").validate({
        rules: {
            // Задаём обязательные поля
            name: {
                required: true,
                minlength: 2
            },
            // compound rule
            phone: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "Пожалуйста введите имя",
                minlength: jQuery.validator.format("Требуется не менее {0} символов")
            },
            email: {
                required: "Пожалуйста введите E-mail",
                email: "Ваш E-mail должен быть в формате name@domain.com"
            }
        }
    });
    $("form").submit(function (e) {
        e.preventDefault();
        if ($(this).valid()) {
            $.ajax({
                type: "POST",
                url: "mailer/smart.php",
                data: $(this).serialize()
            }).done(function () {
                $(this).find("input").val("");
                $('#callbackModal, #orderModal').modal('hide');
                $('#successModal').modal('show');
                $("form").trigger("reset");
            });
        }

        return false;
    });
});