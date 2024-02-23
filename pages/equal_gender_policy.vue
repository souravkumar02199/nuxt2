<template>
    <div>
      <header-bar></header-bar>
      <menu-bar class="d-none d-md-block"></menu-bar>
      <section class="pagetitle">
        <div class="title">
            <h1>Digital Press Equal Gender Pay Policy</h1>
        </div>
    </section>

    <section class="terms">
        <div class="container_wrap">
            <p>Gender equality, in simple terms, implies that both the similarities and the differences between women and men and the varying roles they play are equally accepted and valued by society.</p>

            <h2>The Policy</h2>
            <p>Digital Press Ltd believes in providing equal job opportunities to all its employees. Hence, it is the Company&#39;s policy that there should be no prejudice against or harassment of any employee or job aspirant either directly or indirectly
                on the basis of:</p>

            <ul>
                <li>Disability (e.g., a long term mental or physical impairment)</li>
                <li>Sex change status</li>
                <li>Race, colour, nationality or national or ethnic origin (&quot;race&quot;)</li>
                <li>Sexual orientation</li>
                <li>Religion or philosophical belief</li>
                <li>Political belief</li>
                <li>Sex or marital status</li>
                <li>Trade union activity or age</li>
            </ul>

            <p>The Company seeks to eradicate bias and harassment from the workplace as far as is practically feasible, motivate its workforce to lead by example against any form of discrimination and harassment; prevent employees from practising discriminatory
                behaviour or harassment; and assure its personnel that they can rely upon the Company&#39;s support in any instance of discrimination or harassment at job.</p>

            <p>Digital Press is fully dedicated to offering a cordial and safe working environment that provides fair treatment and equal opportunities to everyone and wherein every employee is valued and given due respect. The Company&#39;s aim is that
                wages, employment, promotion, and retention should not be affected by unrelated concerns and stereotyping. The Company&#39;s equal opportunities policy will support all employees in maximising their skills and talents to their full potential
                and resources of the personnel will be fully exploited to increase the efficiency of the firm.
            </p>

            <p>Even though the Company acknowledges that largely the accountability for the successful implementation of this policy, lies with the Board of Directors, all employees, irrespective of their designation within the Company, are to some extent
                responsible in making certain the effective execution of the policy in their routine activities and professional relationships with coworkers. Employees must ensure that:</p>

            <ul>
                <li>They collaborate with any measures launched to build up equal opportunities.</li>
                <li>They must accommodate and value the sensitivities of others.</li>
                <li>They do not participate in taking biased actions or decisions that violate the spirit of this policy and, employees involved in decision-making should ensure that those who report to them also abide by the policy.</li>
                <li>They do not teach, encourage, or try to persuade or coerce other workers to operate in breach of this policy.</li>
                <li>Personnel who bring complaints of violation of this policy are given a just treatment at the time of the complaint and subsequently.</li>
            </ul>

            <p>Infringement of the Company&#39;s equal opportunities policy and practices and any undue or illegal prejudice will not be accepted and will be dealt with under the Group&#39;s disciplinary procedures. In certain serious instances, this could
                even lead to firing of the related individual.</p>

            <h3>Communication</h3>
            <p>This policy and associated action programmes should be communicated extensively and efficiently across the workforce and to prospective employees. It is the duty of management at all levels to make sure that such communication is conveyed
                and subsequently implemented.</p>

        </div>
    </section>
    </div>
  </template>
  
  <script>
  import HeaderBar from '../components/layout/HeaderBar.vue'
  import MenuBar from '../components/layout/MenuBar.vue'
  export default {
    middleware: 'scrollToTopMiddleware',
    components: { HeaderBar, MenuBar },
  
  }
  </script>