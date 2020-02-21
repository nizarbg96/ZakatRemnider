package smoothalgo.web.rest;

import smoothalgo.domain.Zakat;
import smoothalgo.service.ZakatService;
import smoothalgo.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link smoothalgo.domain.Zakat}.
 */
@RestController
@RequestMapping("/api")
public class ZakatResource {

    private final Logger log = LoggerFactory.getLogger(ZakatResource.class);

    private static final String ENTITY_NAME = "zakat";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ZakatService zakatService;

    public ZakatResource(ZakatService zakatService) {
        this.zakatService = zakatService;
    }

    /**
     * {@code POST  /zakats} : Create a new zakat.
     *
     * @param zakat the zakat to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new zakat, or with status {@code 400 (Bad Request)} if the zakat has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/zakats")
    public ResponseEntity<Zakat> createZakat(@Valid @RequestBody Zakat zakat) throws URISyntaxException {
        log.debug("REST request to save Zakat : {}", zakat);
        if (zakat.getId() != null) {
            throw new BadRequestAlertException("A new zakat cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Zakat result = zakatService.save(zakat);
        return ResponseEntity.created(new URI("/api/zakats/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /zakats} : Updates an existing zakat.
     *
     * @param zakat the zakat to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated zakat,
     * or with status {@code 400 (Bad Request)} if the zakat is not valid,
     * or with status {@code 500 (Internal Server Error)} if the zakat couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/zakats")
    public ResponseEntity<Zakat> updateZakat(@Valid @RequestBody Zakat zakat) throws URISyntaxException {
        log.debug("REST request to update Zakat : {}", zakat);
        if (zakat.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Zakat result = zakatService.save(zakat);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, zakat.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /zakats} : get all the zakats.
     *
     * @param pageable the pagination information.
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of zakats in body.
     */
    @GetMapping("/zakats")
    public ResponseEntity<List<Zakat>> getAllZakats(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("period-is-null".equals(filter)) {
            log.debug("REST request to get all Zakats where period is null");
            return new ResponseEntity<>(zakatService.findAllWherePeriodIsNull(),
                    HttpStatus.OK);
        }
        log.debug("REST request to get a page of Zakats");
        Page<Zakat> page = zakatService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /zakats/:id} : get the "id" zakat.
     *
     * @param id the id of the zakat to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the zakat, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/zakats/{id}")
    public ResponseEntity<Zakat> getZakat(@PathVariable Long id) {
        log.debug("REST request to get Zakat : {}", id);
        Optional<Zakat> zakat = zakatService.findOne(id);
        return ResponseUtil.wrapOrNotFound(zakat);
    }

    /**
     * {@code DELETE  /zakats/:id} : delete the "id" zakat.
     *
     * @param id the id of the zakat to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/zakats/{id}")
    public ResponseEntity<Void> deleteZakat(@PathVariable Long id) {
        log.debug("REST request to delete Zakat : {}", id);
        zakatService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
