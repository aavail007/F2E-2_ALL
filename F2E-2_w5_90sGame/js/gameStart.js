const gameStart = {
    key: 'gameStart',
    preload: function () {
        // 載入背景
        this.load.image('startBg', './img/w5_90secgame_start.png');
        this.load.image('playBtn', './img/button_play.png');
        this.load.image('hint', './img/button_hint.png');
    },
    create: function () {
        // 資源載入完成，加入遊戲物件及相關設定
        this.startBg = this.add.tileSprite(cw / 2, ch / 2, cw, ch, 'startBg');
        this.playBtn = this.add.image(cw / 2 + 180, ch / 2 + 260, 'playBtn');
        this.hint = this.add.tileSprite(cw / 2 + 270, ch / 2 + 260, 50, 50, 'hint');
        // 開啟互動（有這個才能點擊事件）
        this.playBtn.setInteractive();
        this.playBtn.on('pointerdown', () => {
            this.scene.start('gamePlay');
        });

        this.hint.setInteractive();
        this.hint.on('pointerdown', () => {
            this.scene.start('commentary');
        });

    },
    update: function () {

    }
}