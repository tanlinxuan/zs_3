<script type="text/jsx">
    var SEPARATION = 100, AMOUNTX = 60, AMOUNTY = 60;
    var container;
    var camera, scene, renderer;
    var particles, particle, count = 0;
    var mouseX = -300, mouseY = -400;
    export default {
        name: "Canvas",
        methods:{
            init() {
                container = this.$refs.canvas
                camera = new THREE.PerspectiveCamera( 115, window.innerWidth / window.innerHeight, 1, 15000 );
                camera.position.z = 1000;

                scene = new THREE.Scene();

                particles = new Array();

                var PI2 = Math.PI * 2;
                var material = new THREE.ParticleCanvasMaterial( {
                    color: 0x0c437a,
                    program: function ( context ) {
                        context.beginPath();
                        context.arc( 0, 0, 1, 0, PI2, true );
                        context.fill();
                    }
                } );
                var i = 0;
                for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
                    for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
                        particle = particles[ i ++ ] = new THREE.Particle( material );
                        particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
                        particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
                        scene.add( particle );
                    }
                }
                renderer = new THREE.CanvasRenderer();
                renderer.setSize( window.innerWidth, window.innerHeight );
                container.appendChild( renderer.domElement );
            },

            animate() {
                requestAnimationFrame( this.animate );
                this.renderDom();
            },

            renderDom() {
                camera.position.x += ( mouseX - camera.position.x ) * .05;
                camera.position.y += ( - mouseY - camera.position.y ) * .05;
                camera.lookAt( scene.position );
                var i = 0;
                for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
                    for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
                        particle = particles[ i++ ];
                        particle.position.y = ( Math.sin( ( ix + count ) * 0.2 ) * 50 ) + ( Math.sin( ( iy + count ) * 0.4 ) * 50 );
                        particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 2 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 2;

                    }
                }
                renderer.render( scene, camera );
                count += 0.08;
            }
        },
        mounted() {
            this.init();
            this.animate()
        },
        render(createElement, context) {
            return <div class="canvas" ref="canvas"></div>
        }
    }
</script>
<style scoped>
    .canvas{
        position: fixed;
        width: 100%;
        height: 90%;
        bottom: 0;
    }
</style>