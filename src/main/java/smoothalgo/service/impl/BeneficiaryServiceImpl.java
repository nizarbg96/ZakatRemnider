package smoothalgo.service.impl;

import smoothalgo.service.BeneficiaryService;
import smoothalgo.domain.Beneficiary;
import smoothalgo.repository.BeneficiaryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Beneficiary}.
 */
@Service
@Transactional
public class BeneficiaryServiceImpl implements BeneficiaryService {

    private final Logger log = LoggerFactory.getLogger(BeneficiaryServiceImpl.class);

    private final BeneficiaryRepository beneficiaryRepository;

    public BeneficiaryServiceImpl(BeneficiaryRepository beneficiaryRepository) {
        this.beneficiaryRepository = beneficiaryRepository;
    }

    /**
     * Save a beneficiary.
     *
     * @param beneficiary the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Beneficiary save(Beneficiary beneficiary) {
        log.debug("Request to save Beneficiary : {}", beneficiary);
        return beneficiaryRepository.save(beneficiary);
    }

    /**
     * Get all the beneficiaries.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Beneficiary> findAll(Pageable pageable) {
        log.debug("Request to get all Beneficiaries");
        return beneficiaryRepository.findAll(pageable);
    }

    /**
     * Get one beneficiary by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Beneficiary> findOne(Long id) {
        log.debug("Request to get Beneficiary : {}", id);
        return beneficiaryRepository.findById(id);
    }

    /**
     * Delete the beneficiary by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Beneficiary : {}", id);
        beneficiaryRepository.deleteById(id);
    }
}
