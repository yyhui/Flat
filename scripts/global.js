function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

function Tree(opt) {
    this.opt = opt || {
        root: '.tree',
        node: 'tree-node',
        text: 'node-text',
        fold: 'fold',
        unfold: 'unfold',
        selected: 'selected'
    };

    this._root = $(this.opt.root).first();
}

Tree.prototype = {
    init: function(data) {
        this.append(this._root, data, true);
    },

    append: function(parent, data, unfold) {
        if (!data || data.length === 0) return;

        var i = 0, len = data.length, node;

        if (unfold) {
            parent.addClass(this.opt.unfold);
        } else {
            parent.addClass(this.opt.fold);
        }

        for (; i < len; i++) {
            node = this.addNode(parent, data[i].text);
            if (i === 0) node.addClass(this.opt.selected);
            this.append(node, data[i].children, data[i].unfold);
        }
    },

    addNode: function(parent, text) {
        var elem = $('<div></div>'),
            label = $('<div></div>').text(text);
            
        elem.addClass(this.opt.node);
        if (parent.hasClass(this.opt.fold)) {
            elem.addClass('hidden');
        }
        label.addClass(this.opt.text);
        label.append('<div></div>');
        label.click(function(e) {
            this.fold($(e.target.parentNode));
        }.bind(this));
        
        elem.append(label);
        parent.append(elem);

        return elem;
    },

    getChildren: function(node) {
        return node.children('.' + this.opt.node);
    },

    fold: function(node) {
        if (!node.hasClass(this.opt.fold) && !node.hasClass(this.opt.unfold)) {
            this.clearSelected(node.parent());
            node.addClass(this.opt.selected);
            return;
        }

        var children = this.getChildren(node),
            i = 0, len = children.length, flag = false;

        if (node.hasClass(this.opt.fold)) {
            this.clearFold(node);
        }

        for (; i < len; i++) {
            $(children[i]).toggleClass('hidden');
            if ($(children[i]).hasClass(this.opt.selected)) flag = true;
        }

        if (!flag) $(children[0]).addClass(this.opt.selected);

        node.toggleClass(this.opt.fold);
        node.toggleClass(this.opt.unfold);
    },

    clearFold: function(node) {
        var sibling = $(node).siblings('.' + this.opt.unfold).first();
        sibling.removeClass(this.opt.unfold);
        sibling.addClass(this.opt.fold);
        sibling.children('.' + this.opt.node).toggleClass('hidden');
    },

    clearSelected: function(node) {
        node.find('.' + this.opt.selected).removeClass(this.opt.selected);
    }
}

addLoadEvent(function() {
    var data = [
        {
            text: 'Your stats',
            children: [
                {text: 'All visitors'},
                {text: 'Real time'},
                {text: 'Traffics sources'}
            ],
            unfold: true
        },
        {
            text: 'Settings',
            children: [
                {text: 'All visitors'},
                {text: 'Real time'},
                {text: 'Traffics sources'}
            ]
        },
        {
            text: 'Appearance',
            children: [
                {text: 'All visitors'},
                {text: 'Real time'},
                {text: 'Traffics sources'}
            ]
        }
    ],
        tree = new Tree();

    tree.init(data);

    $('.range-slider').jRange({
        from: 0,
        to: 100,
        step: 1,
        scale: [0,25,50,75,100],
        format: '%s%',
        width: 290,
        showLabels: true,
        isRange : true
    });
});
