// **********************ヘッダー**********************
/* JS_drawer v1.2.0 ,2024 */
/* create by syo motoyama,2022*/

// DOMContentLoadedイベントで、webサイトが完全に読み込み終わってからJavascriptが動くように設定。
document.addEventListener("DOMContentLoaded", function () {
    //ドロワーメニューのボタン要素を取得
    const toggleButton = document.querySelector("#drawerButton");
    //ドロワーメニューのメニュー要素を取得
    const drawerMenu = document.getElementById("menu");

    // ドロワーメニューのボタンをクリックした際の処理
    toggleButton.addEventListener("click", function (event) {
        // stopProgapation()メソッドを使って、クリックイベントが親要素に伝播しないようにします。
        //今回、ドロワーメニューのボタンと、webサイト全体にクリックイベントを設定するため、
        //ドロワーボタンをクリックした時はwebサイト全体のクリックイベントが動かないようにしています。
        event.stopPropagation();
        drawerMenu.classList.toggle("open");
        toggleButton.classList.toggle("close");
    });

    // ドロワーメニュー内のアンカーリンクを取得します。
    const anchorLinks = document.querySelectorAll("#menu li a");

    // 取得したアンカーリンク全てにクリックイベントを設定。
    anchorLinks.forEach(function (anchorLink) {
        anchorLink.addEventListener("click", function () {
            drawerMenu.classList.remove("open");
            toggleButton.classList.remove("close");
        });
    });

    // ドキュメント（webサイト）内をクリックした際の処理
    document.addEventListener("click", function (event) {
        const targetElement = event.target;

        // ドロワーメニューが開いている場合に限り、ドロワーメニュー外をクリックで閉じます
        if (
            drawerMenu.classList.contains("open") &&
            !drawerMenu.contains(targetElement) &&
            targetElement !== toggleButton
        ) {
            drawerMenu.classList.remove("open");
            toggleButton.classList.remove("close");
        }
    });
});

// const JSbutton = document.getElementById("drawerButton");
// const JSmenu = document.getElementById("menu");

// function drawermenu() {
//     JSbutton.classList.toggle("close");
//     JSmenu.classList.toggle("open");
// }

// JSbutton.addEventListener("click", drawermenu);
// **********************時間で変わる画像**********************
document.addEventListener("DOMContentLoaded", () => {
    const slide = document.querySelector(".header_slide");

    function updateImageByTime() {
        const now = new Date();
        const hours = now.getHours();
        let activeIndex = 0;
        if (hours >= 6 && hours < 17) {
            activeIndex = 0; // 画像1: AM6:00〜PM5:00
            slide.setAttribute("src", "images/morning_resize.jpg");
        } else if (hours >= 17 && hours < 19) {
            activeIndex = 1; // 画像2: PM5:00〜PM7:00
            slide.setAttribute("src", "images/evenig_rsize.jpg");
        } else {
            activeIndex = 2; // 画像3: PM7:00〜AM6:00
            slide.setAttribute("src", "images/night_resize.jpg");
        }
    }

    updateImageByTime();

    // 毎分画像を更新
    setInterval(updateImageByTime, 60000); // 60秒ごとにチェック
});

// **********************TOPに戻るボタン**********************
document.addEventListener("DOMContentLoaded", function () {
    const topButton = document.getElementById("topReturn");

    // スクロール時にボタン表示/非表示を切り替える
    function toggleTopButton() {
        if (window.scrollY > 300) {
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }
    }

    // スクロールイベントでボタン表示/非表示を切り替え
    window.addEventListener("scroll", toggleTopButton);

    // リサイズ時にもボタン表示/非表示を確認
    window.addEventListener("resize", toggleTopButton);

    // ボタンをクリックしたらトップにスクロール
    topButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    // 初期状態でボタンの表示/非表示を判定
    toggleTopButton();
});

// **********************月ごとに変わるJS**********************
document.addEventListener("DOMContentLoaded", () => {
    const slide = document.querySelector(".season_slide");

    function updateImageByMonth() {
        const now = new Date();
        const month = now.getMonth(); // 月を取得 (0〜11)
        let activeIndex = 0;

        // 3月から4月 (春)
        if (month === 2 || month === 3) {
            activeIndex = 0; // 春の画像
            slide.setAttribute("src", "images/spring.jpg");
        }
        // 5月から10月 (夏)
        else if (month >= 4 && month <= 9) {
            activeIndex = 1; // 夏の画像
            slide.setAttribute("src", "images/autumn_resize.jpg");
        }
        // 11月から2月 (秋・冬)
        else {
            activeIndex = 2; // 秋・冬の画像
            slide.setAttribute("src", "images/winter_resize.jpg");
        }
    }

    updateImageByMonth();
    //******************/ 月と年を毎月更新してくれるJS**********************
    // 毎月初めに画像を更新 (最初にページが読み込まれる時に更新)
    setInterval(updateImageByMonth, 86400000); // 24時間ごとにチェック

    // 月名の配列
    const months = [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
    ];

    // 現在の日付を取得
    const today = new Date();

    // 現在の年と月（0〜11の値）を取得
    let currentYear = today.getFullYear(); // 西暦
    let currentMonthIndex = today.getMonth(); // 0が1月、11が12月

    // 現在の年月を表示
    function updateDateDisplay() {
        document.querySelector(".year").textContent = `${currentYear} `;
        document.querySelector(
            ".month"
        ).textContent = `${months[currentMonthIndex]}`;
    }

    // 初期表示
    updateDateDisplay();

    // 毎日更新するための関数
    function updateMonth() {
        const now = new Date();
        const newYear = now.getFullYear();
        const newMonthIndex = now.getMonth();

        // 月が変わった場合のみ表示を更新
        if (newYear !== currentYear || newMonthIndex !== currentMonthIndex) {
            currentYear = newYear; // 現在の年を更新
            currentMonthIndex = newMonthIndex; // 現在の月を更新
            updateDateDisplay(); // 月と年を更新して表示
        }
    }

    // 1日1回、0時に月と年を確認して更新する
    setInterval(updateMonth, 24 * 60 * 60 * 1000); // 1日ごとに更新
});
