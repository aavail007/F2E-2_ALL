const getRandom = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const gamePlay = {
    key: 'gamePlay',
    preload: function () {
        // 載入背景
        this.load.image('bg1', './img/w5_90secgame_bg01.png');
        this.load.image('footer', './img/map1_rock.png');
        this.load.image('topSpace', './img/top_space.png');
        // 載入烏龜
        this.load.spritesheet('turtle', './img/turtlemove2.0.png', {
            frameWidth: 400,
            frameHeight: 139
        });

        // 時間泡泡
        this.load.image('timebubble', './img/timebubble.png');

        // 烏龜殼（生命值）
        this.load.image('turtlelife', './img/turtlelife.png');
        // 垃圾圖
        // this.load.image('trash1', 'img/trash1.png');
        // this.load.image('trash2', 'img/trash2.png');
        // this.load.image('trash3', 'img/trash3.png');

        // this.trashArr = []; // 存放所有垃圾實體
        // this.trashArr2 = []; // 存放所有垃圾實體2
        // this.masIdx = 0; // 垃圾索引
        // this.masIdx2 = 1; // 垃圾索引2
        this.TimeStep = 90; // 遊戲時間
    },
    create: function () {
        // 資源載入完成，加入遊戲物件及相關設定
        this.bg1 = this.add.tileSprite(cw / 2, ch / 2, cw, ch, 'bg1');
        this.footer = this.add.tileSprite(cw / 2, 670, cw, 200, 'footer');
        this.timebubble = this.add.tileSprite(cw - 100, ch / 2 - 300, 85, 85, 'timebubble');
        this.turtlelife = this.add.tileSprite(cw / 2 - 500, ch / 2 - 300, 75, 70, 'turtlelife');
        this.topSpace = this.add.tileSprite(cw / 2, 90, cw, 100, 'topSpace');
        // 把 footer 加入 physics 世界
        this.physics.add.existing(this.footer);
        this.physics.add.existing(this.topSpace);

        // 設定物件不會動靜止不會掉下去
        this.footer.body.immovable = true;
        this.topSpace.body.immovable = true;
        // 物件的位置和旋轉是否受其速度，加速度，阻力和重力的影響
        this.footer.body.moves = false;

        //設定烏龜位置
        this.player = this.physics.add.sprite(cw / 2 - 200, ch / 2, 'turtle');

        //設定烏龜示大小
        this.player.setScale(0.5);

        //設定角色碰撞邊界
        this.player.setSize(350, 150, 0);

        // 設定不會彈出邊界
        this.player.setCollideWorldBounds(true);

        //將需要碰撞的物件綁在一起
        this.physics.add.collider(this.player, this.footer);
        this.physics.add.collider(this.player, this.topSpace);

        //設定動畫播放
        this.anims.create({
            // 此動畫的名字
            key: 'run',
            frames: this.anims.generateFrameNumbers('turtle', {
                start: 0,
                end: 2
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            // 此動畫的名字
            key: 'speed',
            frames: this.anims.generateFrameNumbers('turtle', {
                start: 0,
                end: 3
            }),
            frameRate: 15,
            repeat: -1
        });

        //設定文字
        this.timeText = this.add.text(cw - 120, ch / 2 - 310, `${this.TimeStep}`, {
            fontSize: '28px',
            fill: '#FFFFFF'
        });
        this.lifeText = this.add.text(cw / 2 - 450, ch / 2 - 320, `X3`, {
            fontSize: '28px',
            fill: '#707070'
        });

        // 遊戲計時器
        let gametime = setInterval(() => {
            this.TimeStep--;
            //重新設定文字
            this.timeText.setText(`${this.TimeStep}`);
            if (this.TimeStep < 20 && this.TimeStep > 10) {
                this.bgSpeed = 1.6;
            } else if (this.TimeStep < 10 && this.TimeStep > 0) {
                this.bgSpeed = 3;
            } else if (this.TimeStep <= 0) {
                this.gameStop = true;
                clearInterval(gametime);
                let congratulations = this.add.image(cw - 100, ch / 2 - 280, 'congratulations');
                congratulations.setScale(0.8);
                let playAgainBtn = this.add.image(cw - 100, ch / 2 - 280, 'playAgainBtn');
                playAgainBtn.setScale(0.6);
                playAgainBtn.setInteractive();
                playAgainBtn.on('pointerdown', () => this.scene.start('gameStart'));
            }
        }, 1000);


        // 加入物理效果
        // const addPhysics = GameObject => {
        //     this.physics.add.existing(GameObject);
        //     GameObject.body.immovable = true;
        //     GameObject.body.moves = false;
        // }

        //碰撞到後停止遊戲
        // const hittest = (player, trash) => {
        //     this.gameStop = true;
        //     this.player.setBounce(0);
        //     this.player.setSize(110, 100, 0);
        //     this.player.anims.play('deel', true);
        //     clearInterval(gametime);
        //     let gameover = this.add.image(cw / 2, ch / 2 - 40, 'gameover');
        //     gameover.setScale(0.8);
        //     let tryAgainBtn = this.add.image(cw / 2, ch / 2 + 30, 'tryAgainBtn');
        //     tryAgainBtn.setScale(0.6);
        //     tryAgainBtn.setInteractive();
        //     tryAgainBtn.on('pointerdown', () => this.scene.start('gameStart'));
        // }

        // 垃圾的座標資訊
        // const masPos = [{
        //         name: 'trash1',
        //         x: cw / 2,
        //         y: ch / 2 + 50,
        //         w: 40,
        //         h: 40
        //     },
        //     {
        //         name: 'trash2',
        //         x: cw / 2,
        //         y: ch / 2,
        //         w: 40,
        //         h: 40
        //     },
        //     {
        //         name: 'trash3',
        //         x: cw / 2,
        //         y: ch / 2 + 200,
        //         w: 40,
        //         h: 40
        //     },
        // ]

        // 產生垃圾
        // for (let i = 0; i < 10; i++) {
        //     let BoolIdx = getRandom(2, 0);
        //     let BoolIdx2 = getRandom(2, 0);
        //     this['trash' + i] = this.add.tileSprite(masPos[BoolIdx].x, masPos[BoolIdx].y, masPos[BoolIdx].w, masPos[BoolIdx].h, masPos[BoolIdx].name);
        //     this['trashB' + i] = this.add.tileSprite(masPos[BoolIdx2].x, masPos[BoolIdx2].y, masPos[BoolIdx2].w, masPos[BoolIdx2].h, masPos[BoolIdx2].name);
        //     this.trashArr.push(this['trash' + i]);
        //     this.trashArr2.push(this['trashB' + i]);
        //     addPhysics(this['trash' + i]);
        //     addPhysics(this['trashB' + i]);
        //     this.physics.add.collider(this.player, this['trash' + i], hittest);
        //     this.physics.add.collider(this.player, this['trashB' + i], hittest);
        // }

    },
    update: function () {
        // 遊戲狀態更新
        this.footer.tilePositionX += 4;


        // this.trashArr[this.masIdx].x -= 3 * this.bgSpeed;

        // 檢測怪物是否超出邊界然後返回
        // for (let i = 0; i < this.trashArr.length; i++) {
        //     if (this.trashArr[i].x <= -100) {
        //         this.trashArr[i].x = cw + 200;
        //         this.masIdx = getRandom(this.trashArr.length - 1, 0);
        //     }
        //     if (this.trashArr2[i].x <= -100) {
        //         this.trashArr2[i].x = cw + getRandom(400, 200);
        //         this.masIdx2 = getRandom(this.trashArr2.length - 1, 0);
        //     }
        // }


        // 啟動鍵盤事件
        let cursors = this.input.keyboard.createCursorKeys();
        if (cursors.right.isDown) {
            this.player.setVelocityX(200); //設定這個前需要設定 physics
            this.player.setSize(400, 150, 0); //碰撞邊界
            this.player.anims.play('speed', true);
            this.player.flipX = false; //烏龜是否轉向
        } else if (cursors.left.isDown) {
            this.player.setVelocityX(-300);
            this.player.setSize(400, 150, 0); //碰撞邊界
            this.player.anims.play('speed', true);
            this.player.flipX = true; //烏龜是否轉向
        } else if (cursors.up.isDown) {
            this.player.setVelocityY(-300);
            this.player.setSize(400, 150, 0); //碰撞邊界
            this.player.anims.play('speed', true);
            this.player.flipY = false;
        } else if (cursors.down.isDown) {
            this.player.setVelocityY(300);
            this.player.setSize(400, 150, 0); //碰撞邊界
            this.player.anims.play('speed', true);
            this.player.flipY = false;
        } else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            this.player.anims.play('run', true);
            this.player.setSize(400, 150, 0); //碰撞邊界
            this.player.flipX = false;
        }
    }
}