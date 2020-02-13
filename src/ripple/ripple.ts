import './_mixins.scss'

export class towRipple {
    constructor (tags: string) {
        // 定义一个名字为 el （点击事件） 和 e 的函数 [].map() 回调函数 
        [].map.call(document.querySelectorAll(tags), (el:any)=> {
            el.addEventListener('click',(e:any) => {
                e = e.touches ? e.touches[0] : e;
                // Element.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置。
                const r = el.getBoundingClientRect()
                // Math.sqrt 返回的是 平方根 ， Math.pow() 函数返回基数（base）的指数（exponent）次幂，即 baseexponent。
                const d = Math.sqrt(Math.pow(r.width,2)+Math.pow(r.height,2)) * 2;
                el.style.cssText = `--s: 0; --o: 1;`;  el.offsetTop; 
                el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${e.clientX - r.left}; --y:${e.clientY - r.top};`
            })
        })
    }
}