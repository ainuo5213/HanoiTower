(function ($) {
    let config = {
        column1: $('.column').eq(0),
        column2: $('.column').eq(1),
        column3: $('.column').eq(2),
        columns: {
            count: 3,
            column1: [3, 2, 1],
            column2: [],
            column3: []
        },
        minWidth: 50,
        step: 30
    };

    function HanoiTower(count) {
        return new HanoiTower.prototype.init(count);
    }

    HanoiTower.prototype = {
        init: function (count) {
            count && this.changeConfig(count);
            this.initColumn();
            this.initEvent();
        },
        initEvent: function () {
            let self = this;
            $('.btns').on('click', 'a', function () {
                let {from, to} = this.dataset, fromColumn = config.columns[from], toColumn = config.columns[to];
                if (config.columns[from].length > 0) {
                    let flag = self.checkSort(fromColumn[fromColumn.length - 1], toColumn[toColumn.length - 1]);
                    if (flag) {
                        self.change(from, to);
                    }
                }
            })
        },
        checkSort: function (from, to) {
            let flag = false;
            if (!to || from < to) {
                flag = true;
            }
            return flag;
        },
        change: function (from, to) {
            config.columns[to].push(config.columns[from].pop());
            this.initColumn();
            setTimeout(() => {
                if (config.columns.column1.length === 0 && config.columns.column2.length === 0) {
                    alert('挑战成功');
                    config.columns.column3 = [];
                    new HanoiTower(config.columns.count);
                }
            }, 0)
        },
        initColumn: function () {
            this.showColumn(config.column1, config.columns.column1);
            this.showColumn(config.column2, config.columns.column2);
            this.showColumn(config.column3, config.columns.column3);
        },
        showColumn: function (el, arr) {
            el.html('');
            let step = config.step, minWidth = config.minWidth;
            for (let i of arr) {
                let div = $('<div>');
                div.css({
                    width: minWidth + (i - 1) * step
                });
                el.append(div);
            }
        },
        changeConfig: function (count) {
            let column1 = config.columns.column1;
            config.columns.count = count;
            for (let i = 1; i <= count; i++) {
                column1[i - 1] = count - i + 1;
            }
        }
    };
    HanoiTower.prototype.init.prototype = HanoiTower.prototype;
    window.HanoiTower = HanoiTower;
})($);