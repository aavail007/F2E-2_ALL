const commentary = {
    key: 'commentary',
    preload: function () {
        // 載入背景
        this.load.image('startBg', './img/w5_90secgame_start.png');
        this.load.image('commentary', './img/Commentary.png');
        this.load.image('closeBtn', './img/button_close.png');
    },
    create: function () {
        // 資源載入完成，加入遊戲物件及相關設定
        this.startBg = this.add.tileSprite(cw / 2, ch / 2, cw, ch, 'startBg');
        this.commentary = this.add.image(cw / 2 + 220, ch / 2, 'commentary');
        this.closeBtn = this.add.tileSprite(cw / 2 + 470, ch / 2 - 180, 30, 30, 'closeBtn');
        this.commentary.setScale(0.7);
        // 開啟互動（有這個才能點擊事件）
        this.closeBtn.setInteractive();
        this.closeBtn.on('pointerdown', () => {
            this.scene.start('gameStart');
        });

    },
    update: function () {

    }
}