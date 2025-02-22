Vue.component("layer-colored-text", {
    props: ["text", "layer", "layerid"],
    computed: {
        textColor: function()
        {
            const lid = new Decimal(this.getLayerId());
            if(this.getLayerId() instanceof Decimal && this.getLayerId().gte(Infinities[2]))
            {
                return "#ff9100";
            }
            if(this.getLayerId() instanceof Decimal && this.getLayerId().gte(Infinities[1]))
            {
                return "#00ffb7";
            }
            if(this.getLayerId() instanceof Decimal && this.getLayerId().gte(Infinities[0]))
            {
                return "#ff00ff";
            }
            let h = 33 * Math.min(lid.toNumber(), 10000);
            let s = Math.min(100, 10 * this.getLayerId());
            if(lid.gt(10000))
            {
                h += Decimal.log10(lid.div(10000)).toNumber() * 600;
            }
            return "hsl(" + h + ", " + s + "%, 50%)";
        },
        textGlow: function()
        {
            const thickness = 0.025 * this.getLayerId();
            const t = [Math.min(0.7, thickness), Math.min(0.7, thickness / 2),
                Math.min(0.7, Math.max(0, thickness - 0.3) / 4)];
            const color = "currentcolor";
            return "0px 0px " + t[0] + "em currentcolor"+
                ",0px 0px " + t[1] + "em currentcolor"+
                ",0px 0px " + t[2] + "em currentcolor";
        }
    },
    methods:
    {
        getLayerId: function()
        {
            return this.layerid;
        },
        getStyle: function()
        {
            const styles = {};
            if(game.settings.resourceColors)
            {
                styles.color = this.textColor;
            }
            if(game.settings.resourceGlow)
            {
                styles.textShadow = this.textGlow;
            }
            return styles;
        }
    },
    template: `<span :style="getStyle()"><slot></slot></span>`
})