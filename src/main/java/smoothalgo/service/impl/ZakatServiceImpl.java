package smoothalgo.service.impl;

import smoothalgo.service.ZakatService;
import smoothalgo.domain.Zakat;
import smoothalgo.repository.ZakatRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link Zakat}.
 */
@Service
@Transactional
public class ZakatServiceImpl implements ZakatService {

    private final Logger log = LoggerFactory.getLogger(ZakatServiceImpl.class);

    private final ZakatRepository zakatRepository;

    public ZakatServiceImpl(ZakatRepository zakatRepository) {
        this.zakatRepository = zakatRepository;
    }

    /**
     * Save a zakat.
     *
     * @param zakat the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Zakat save(Zakat zakat) {
        log.debug("Request to save Zakat : {}", zakat);
        return zakatRepository.save(zakat);
    }

    /**
     * Get all the zakats.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Zakat> findAll(Pageable pageable) {
        log.debug("Request to get all Zakats");
        return zakatRepository.findAll(pageable);
    }


    /**
     *  Get all the zakats where Period is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<Zakat> findAllWherePeriodIsNull() {
        log.debug("Request to get all zakats where Period is null");
        return StreamSupport
            .stream(zakatRepository.findAll().spliterator(), false)
            .filter(zakat -> zakat.getPeriod() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one zakat by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Zakat> findOne(Long id) {
        log.debug("Request to get Zakat : {}", id);
        return zakatRepository.findById(id);
    }

    /**
     * Delete the zakat by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Zakat : {}", id);
        zakatRepository.deleteById(id);
    }
}
